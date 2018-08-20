/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Crypto from 'crypto';

export function securePassword(password) {
  const hmac = Crypto.createHmac('sha256', 'project-h6'); // TODO: Change the key before release
  hmac.update(password);
  return hmac.digest('hex');
}
