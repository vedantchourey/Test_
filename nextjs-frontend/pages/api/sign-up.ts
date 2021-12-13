import type { NextApiRequest, NextApiResponse } from 'next'
import signupService from '../../services/backend-services/auth-service/signup/signup-service';
import { ServiceResponse } from '../../services/backend-services/common/contracts/service-response';
import { SignupRequest, SignupResponse } from '../../services/backend-services/auth-service/signup/signup-contracts';

export default async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<SignupRequest,SignupResponse>>) => {
  if (req.method === 'POST') {
    const result = await signupService(req.body);
    res.status(result.errors ? 400 : 200).json(result);
  }
  res.status(404).json({errors: {}});
}
