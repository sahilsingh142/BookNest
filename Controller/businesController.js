import busniess from '../Schema/businesSchema.js'

export const businessData = async (req, res) => {
    try {
        const { category, businessName, ownerName, village, city, number, services } = req.body;

        const businesExist = await busniess.findOne({ businessName });
        if (businesExist) {
            return res.status(404).json({
                message: "Business name already exists."
            });
        }

        const phoneExist = await busniess.findOne({ number });
        if (phoneExist) {
            return res.status(404).json({
                message: "Phone number already exists"
            });
        }
       
        const profileExist = await busniess.findOne({
            userId: req.user._id,
        });

        if (profileExist) {
            return res.status(404).json({
                message: "Business profile already exists.",
            });
        }
        const busines = new busniess({
               userId: req.user._id, category, businessName, ownerName, village, city, number, services
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

export const getBusinesProfile = async (req, res) => {
    try {
        const businesProfile = await busniess.findOne({
            userId: req.user._id
        });

        if (!businesProfile) {
            return res.status(404).json({
                message: "Business profile not found"
            })
        }

        res.status(200).json(businesProfile)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
}