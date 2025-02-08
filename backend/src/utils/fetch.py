import requests


def fetch_url(url: str) -> dict:
    """
    Fetches the given URL and returns it as a dictionary.

    :param url: the url to fetch
    :return: dict
    """
    r = requests.get(url)
    r.raise_for_status()
    return r.json()
