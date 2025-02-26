export const fetchOilPrices = async () => {
    try {
        const response = await fetch("https://www.pttor.com/wp-admin/admin-ajax.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: new URLSearchParams({
                action: "fetch_oil_prices",
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
