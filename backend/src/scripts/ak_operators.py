from typing import Dict, List

from backend.src.models.category_data_dto import QuestionType
from backend.src.models.ak_operator_dto import AK_OperatorDTO
from backend.src.utils.category import Category


class AK_Operators(Category[AK_OperatorDTO]):
    def __init__(self, question_type: QuestionType):
        url = "https://awedtan.ca/api/operator/search?include=data.name&include=data.itemUsage&include=data.itemDesc"
        super().__init__(source=url, model=AK_OperatorDTO, question_type=question_type)


    """         /**
     * Fetches the list of Arknights operators from arknights API endpoint.
     *
     * @return a mapping of operator names to their data
     */ 
    def getAKOperatorMappings(): Map<String, AKOperator> {
        val url =
          "https://www.arknightsapi.com/v1/operators"
        val response: String? =
          try {
              restTemplate.getForObject(url, String::class.java)
          } catch (e: RestClientException) {
              throw AKOperatorDataException("Failed to fetch Arknights operator data from $url", e)
          }
        return response?.let {
            try {
                val operators = objectMapper.readValue<AKOperatorResponse>(it).operators.associateBy {it.name}.toMutableMap()

                // Removes any operators with chinese profile descriptions or image urls
                operators.values.removeAll { operator ->
                    operator.profile.any { char -> char.code in 0x4E00..0x9FFF } ||
                    "%" in operator.imgUrl
                }

                // Changes the broken image url to a non-broken one hosted on github
                operators.entries.forEach { entry ->
                    entry.setValue(entry.value.copy(imgUrl = "$WORKING_IMG_URL${entry.value.imgUrl.substringAfterLast('/')}"))
                }

                // Censor operator names in profiles
                operators.entries.forEach { entry ->
                    val censoredProfile = entry.value.profile.replace(Regex("(?i)${Regex.escape(entry.key)}", RegexOption.IGNORE_CASE), "*".repeat(entry.key.length))
                    entry.setValue(entry.value.copy(profile = censoredProfile))
                }

                operators
            } catch (e: Exception) {
                throw AKOperatorDataException("Failed to fetch Arknights operator data from $url", e)
            }
        } ?: throw AKOperatorDataException("Arknights operator data is empty or null")
    } """

    def __description_to_name(self) -> Dict[str, List[str]]:
        """
        Returns a mapping of operator descriptions to their names.
        Replaces any apostrophes (') in the name with spaces
        :return: a dict of their titles to their names
        """
        self.name = "Arknights Operator Descriptions"
        self.description = "Guess the Arknights Operators' name by their description!"
        
        # Create a dictionary of operators keyed by name
        operators = {operator.name: op for operator in self._raw_data.operators.values()}
        
        # Censor operator names in profiles
        for name, op in operators.items():
            censored_profile = re.sub(f"(?i){re.escape(name)}", '*' * len(name), op.profile, flags=re.IGNORECASE)
            operators[name] = op.copy(update={"profile": censored_profile})
        
        return operators
        return {
            champion.title: [champion.name.replace("'", " ")]
            for champion in self._raw_data.data.values()
        }

    def __image_to_name(self) -> Dict[str, List[str]]:
        """
        Returns a mapping of operator images to their names.
        Replaces any apostrophes (') in the name with spaces'
        :return: a dict of their images to their names
        """
        self.name = "LoL Champion Covers"
        self.description = "Guess the LoL champion's name by their image!"

        base_img_url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"
        
        image_to_name = {}
        for c in self._raw_data.data.values():
            image_name = c.image.full[0:-4]

            image_to_name[base_img_url + image_name + "_0.jpg"] = [
                c.name.replace("'", " ")
            ]
            image_to_name[base_img_url + image_name + "_1.jpg"] = [
                c.name.replace("'", " ")
            ]

        return image_to_name

    def _format_data(self) -> dict[str, List[str]]:
        return (
            self.__description_to_name()
            if self.question_type == QuestionType.TEXT
            else (self.__image_to_name())
        )
