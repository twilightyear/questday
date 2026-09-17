//시스템 현재 연도 조회 함수
export function getCurrentYear() {
    return new Date().getFullYear();
}

//시스템 현재 달 조회 함수
export function getCurrentMonth() {
    return new Date().getMonth() + 1;
}

//연도 일수 반환 함수
export function getDaysInYear(year) {
    //윤년 판단 로직
    const isLeap = new Date(year, 2, 0).getDate() === 29;

    if(isLeap){
        return 366;
    } else {
        return 365;
    }
}