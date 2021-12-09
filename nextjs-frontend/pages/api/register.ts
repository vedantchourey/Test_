import type { NextApiRequest, NextApiResponse } from 'next'
import signUp from '../../services/backend-services/auth-service/signup/signup';
import { ServiceResponse } from '../../services/backend-services/common/contracts/service-response';
import { SignupResponse } from '../../services/backend-services/auth-service/signup/signup-contracts';

export default async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<SignupResponse>>) => {
  if (req.method === 'POST') {
    const result = await signUp(req.body);
    res.status(result.errors ? 400 : 200).json(result);
  }
  res.status(404).json({errors: {}});
}
