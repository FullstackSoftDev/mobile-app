import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
    try {
        // hier sollte die user_id oder ipAdresse als key verwendet werden
        const { success } = await ratelimit.limit("rate-limit");

        if(!success) {
            return res.status(429).json({
                error: "To many requests, please try again later."
            });
        }

        next();

    } catch (error) {
        console.log("Rate limit error", error);
        next(error);
    }
}

export default ratelimiter