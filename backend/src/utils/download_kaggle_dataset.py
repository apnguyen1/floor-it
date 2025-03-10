import os
from typing import Union

import kagglehub
import pandas as pd


def fetch_kaggle_dataset(
    source: str,
    limit: int = 100,
) -> Union[pd.DataFrame, None]:
    """
    Downloads a dataset from Kaggle and filters for UTF-8 compatible rows.

    Args:
        source: The Kaggle dataset identifier
            (e.g., "nelgiriyewithana/most-streamed-spotify-songs-2024")
        limit: Maximum number of rows to return (default: 100)

    Returns:
        A pandas DataFrame containing only UTF-8 compatible rows (or None if failed)
    """
    try:
        dataset_path = kagglehub.dataset_download(source)

        csv_files = [f for f in os.listdir(dataset_path) if f.endswith(".csv")]
        if not csv_files:
            print(f"No CSV files found in dataset '{source}'")
            return None

        csv_path = os.path.join(dataset_path, csv_files[0])

        df = pd.read_csv(csv_path, encoding="utf-8", encoding_errors="ignore")

        return df.head(limit)

    except Exception as e:
        print(f"Error fetching Kaggle dataset '{source}': {str(e)}")
        return None
