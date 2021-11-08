export const reloadApp = () => {
    if (typeof window !== 'undefined') {
        window.location.href = '';
    }
};

export const isJSONString = (json: any) => {
    let result = false;
    try {
        if (JSON.parse(json)) {
            result = true;
        }
    } catch {
        //
    }
    return result;
};
