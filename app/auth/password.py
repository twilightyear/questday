from pwdlib import PasswordHash

password_hasher = PasswordHash.recommended()

def hash_password(plain_password: str) -> str: #비밀번호 암호화 후 반환
    return password_hasher.hash(plain_password)

def verify_password(plain_password: str, hashed_password: str) -> bool: #비밀번호가 맞는지 검증 후 참거짓 반환
    return password_hasher.verify(plain_password, hashed_password)