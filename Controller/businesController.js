import busniess from '../Schema/businesSchema.js'

export const businessData = async (req, res) => {
    try {
        const { category, businessName, ownerName, village, city, number, services } = req.body;

        const busines = new busniess({
            category, businessName, ownerName, village, city, number, services
        })

        await busines.save();

        res.status(200).json({ message: "Form Data Save", data: busines });
    }
    catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
}