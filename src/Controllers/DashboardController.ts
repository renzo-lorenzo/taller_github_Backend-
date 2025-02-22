import { Request, Response } from 'express';
import DashboardService from '../Services/DashboardService';

export default class DashboardController {
    static async getDashboardData(req: Request, res: Response) {
        try {
            const dashboardData = await DashboardService.getDashboardData();
            res.json(dashboardData);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
