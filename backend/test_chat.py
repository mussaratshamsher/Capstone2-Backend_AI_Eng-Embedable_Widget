import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.models.project import Project
from app.models.conversation import Conversation
import httpx
import json

async def main():
    engine = create_async_engine('postgresql+asyncpg://postgres.cfdefmtfpljparkgnhcs:leadforge%401122@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres')
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as session:
        # Get a project and its latest conversation
        p = (await session.execute(select(Project).filter_by(is_active=True).limit(1))).scalar_one_or_none()
        c = (await session.execute(select(Conversation).filter_by(project_id=p.id).limit(1))).scalar_one_or_none()
        
        print(f"Testing with Project: {p.api_key} and Conversation: {c.id}")
        
    # Test widget session endpoint
    async with httpx.AsyncClient() as client:
        # Send message
        print("\nSending message to chat stream...")
        url = f"http://localhost:8000/api/chat/send?conversation_id={c.id}&project_api_key={p.api_key}"
        
        async with client.stream("POST", url, json={"content": "what we can plan today plan a meeting at 5 pm at resturant AL brakah today"}) as response:
            async for line in response.aiter_lines():
                if line:
                    print("Received:", line)

if __name__ == "__main__":
    asyncio.run(main())
