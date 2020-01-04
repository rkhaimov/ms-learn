export const createStringsGenerator = () => {
    let call = 0;

    return () => {
        call = call + 1;

        return '='.repeat(call);
    };
};

export const getLastReturn = (mock: jest.Mock) => mock.mock.results[mock.mock.results.length - 1].value;
