export const changeFormData = (obj)=>{
    const formData = new FormData();
    Object.keys({obj}).forEach((key) => {
        formData.append(key, obj[key]);
    });
    return formData;
}
