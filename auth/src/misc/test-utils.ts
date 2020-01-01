export const createStringsGenerator = () => {
    let call = 0;

    return () => {
        call = call + 1;

        return String.fromCharCode(call);
    };
};
