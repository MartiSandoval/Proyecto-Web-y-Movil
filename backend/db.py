import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

USE_MOCK = os.getenv("USE_MOCK", "true").lower() == "true"

if not USE_MOCK:
    from supabase import create_client, Client
    supabase: Client = create_client(
        os.getenv("SUPABASE_URL"),
        os.getenv("SUPABASE_SERVICE_KEY"),
    )
else:
    supabase = None
