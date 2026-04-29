import rateLimit from "express-rate-limit";
export const limiter = rateLimit({
	windowMs: 4*1000, // 4 seconds
	max: 6,
	message: "Too many requests from this IP, please try again after 15 minutes",
});