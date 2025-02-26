export const fetchOilPrices = async () => {
    try {
        const response = await fetch("https://us-central1-my-project-dev-a68cb.cloudfunctions.net/demo_fuels_price/oilprices", {
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


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📢 API Response:", data);
        return data;
    } catch (error) {
        console.error("❌ API Error:", error);
        return null;
    }
};
