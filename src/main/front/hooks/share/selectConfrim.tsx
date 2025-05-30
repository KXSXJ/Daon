


export const selectConfrim= (massage = " ", onConfirm: () => void, onCancel: () => void =()=>{}) => {
    let result;
    if (typeof onConfirm !== "function") {
        return;
    }
    if (typeof onCancel !== "function") {
        return;
    }
    const confirmAction = () => { //취할 행동
        if (window.confirm(massage)) { //확신 시
            onConfirm();
            result = true;
        } else {
            onCancel(); //취소 누르면 실행
            result = false;
        }
    };
    confirmAction()
    return result;
}
