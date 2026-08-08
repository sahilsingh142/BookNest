import busniess from '../Schema/businesSchema.js';
import { getIO } from "../Socket/socket.js";

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

export const getAllBusniessData = async (req, res) => {
    try {
        const business = await busniess.find();

        res.status(200).json({
            message: "Data send successful", data: business
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error In Seding Business Data"
        });
    }
}

export const updateBusiness = async (req, res) => {
    try {
        const {
            businessName,
            ownerName,
            village,
            city,
            number,
            services,
        } = req.body;

        const business = await busniess.findOne({
            userId: req.user._id,
        });

        if (!business) {
            return res.status(404).json({
                message: "Business profile not found",
            });
        }

        if (businessName && businessName !== business.businessName) {
            const existBusiness = await busniess.findOne({
                businessName, _id: { $ne: business._id },
            });

            if (existBusiness) {
                return res.status(400).json({
                    message: "Business name already exists",
                });
            }
        }

        if (number && number !== business.number) {
            const existPhone = await busniess.findOne({
                number,
                _id: { $ne: business._id },
            });

            if (existPhone) {
                return res.status(400).json({
                    message: "Phone number already exists",
                });
            }
        }

        business.businessName = businessName;
        business.ownerName = ownerName;
        business.village = village;
        business.city = city;
        business.number = number;
        business.services = services;

        await business.save();

        const io = getIO();

        io.emit("businessStatusUpdated", {
            businessId: business._id,
            status: business.status,
            waitTime: business.waitTime
        });

        res.status(200).json({
            message: "Business profile updated successfully",
            data: business,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status, waitTime } = req.body;

        const business = await busniess.findOne({
            userId: req.user._id,
        });

        business.status = status;
        business.waitTime = status === "available" ? 0 : waitTime;

        await business.save();

        res.status(200).json({
            data: business
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Status Error",
        });
    }
}

export const getStatusData = async (req, res) => {
    try {
        const business = await busniess.findOne({
            userId: req.user._id,
        });

        console.log(business)
        if (!business) {
            return res.status(404).json({
                message: "Business not found"
            });
        }

        res.status(200).json({
            status: business.status,
            waitTime: business.waitTime
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}