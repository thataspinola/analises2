exports.getPayload = (parsedInputData) => {
    return (parsedInputData || []).map(item => ({
            date: item.data,
            dayOfWeek: item.diaSemana
        }))
    };
