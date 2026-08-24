from fastapi import APIRouter, status, HTTPException
from sqlalchemy import select
from database.db_connection import SessionFactory
from models.calendar import Calendar
from auth.password import hash_password, verify_password
from schema.calendar.calendar_request import CalendarCreateRequest, CalendarUpdateRequest
from schema.calendar.calendar_response import CalendarResponse