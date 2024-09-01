import { useQuery } from 'react-query';
import { almariService } from '../services/customer';

export const useCartData = (params) =>
    useQuery(['cart-data', params], async () => {
      try {
        let response = await almariService.getCartItems(params);
        return response
      } catch (error) {
        Router.push(APP_ROUTES.SERVER_ERROR);
      }
    },
  );