export const fetchOilPrices = async () => {
    try {
        const response = await fetch("https://us-central1-fir-fuels-price.cloudfunctions.net/app/oilprice");

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
