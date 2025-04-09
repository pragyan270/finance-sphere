
const retrieveDocument = require('../Models/stat'); 


const DashController = {};

DashController.getDashboardData = async (req, res) => {
    try {
        
        const userData = await retrieveDocument({}); 

        

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "No user data found.",
            });
        }

        
        const { name, income, expenditure } = userData;

        
        const netSavingsPerMonth = {};
        for (const month in income) {
            const monthlyIncome = income[month] || 0;
            const monthlyExpenditure = expenditure[month] || 0;
            netSavingsPerMonth[month] = monthlyIncome - monthlyExpenditure;
        }

       
        const incomeSummary = Object.values(income).reduce((acc, val) => acc + val, 0);
        const expenditureSummary = Object.values(expenditure).reduce((acc, val) => acc + val, 0);
        const totalNetSavings = incomeSummary - expenditureSummary;

      
        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully.",
            data: {
                user: {
                    name,
                },
                income,
                expenditure,
                netSavingsPerMonth,
                incomeSummary,
                expenditureSummary,
                totalNetSavings,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error occurred while retrieving dashboard data.",
            error: error.message,
        });
    }
};

module.exports = DashController;
