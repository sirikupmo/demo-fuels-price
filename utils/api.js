export const fetchOilPrices = async () => {
    try {
        let url;
        // url = "https://us-central1-my-project-dev-a68cb.cloudfunctions.net/demo_fuels_price/oilprices";
        if (process.env.NODE_ENV === "production") {
            url = "https://us-central1-my-project-dev-a68cb.cloudfunctions.net/demo_fuels_price/oilprices";
        } else {
            url = `http://localhost:${process.env.portDev}/oilprices`;
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                province: "กรุงเทพมหานคร",
                month: "2",
                year: "2568",
            }),
        });

        if (response.ok) {
            const responseJson = await response.json();
            console.log("API Response:", responseJson);
            return responseJson.data;
        } else {
            console.error("API Error:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("fetchOilPrices Error:", error);
        return null;
    }
};
