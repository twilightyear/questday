from fastapi import HTTPException, APIRouter
from sqlalchemy import select
from starlette import status
from database.db_connection import SessionFactory
from models.daily import Daily
from schema.daily.daily_request import TodoCreateRequest, TodoUpdateRequest
from schema.daily.daily_response import TodoResponse

router = APIRouter(tags=["Daily"])