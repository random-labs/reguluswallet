import _ from 'lodash';
import {SET_KEYS, LOAD_ACCOUNT, LOAD_OPERATIONS, RESET} from '../constants/types';

const INITIAL_STATE = {
    public_key: undefined,
    secret_key: undefined,
    balance: 0,
    transactions: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_KEYS:
            return {...state, public_key: action.public_key, secret_key: action.secret_key};
        case LOAD_ACCOUNT:
            let nativeBalance = _.find(action.account.balances, function (b) {
                return b.asset_type == 'native';
            });

            return {...state, balance: nativeBalance.balance};
        case LOAD_OPERATIONS:
            let transactions = _.filter(action.operations, function (o) {
                return o.type == 'payment';
            });

            return {...state, transactions: transactions};
        case RESET:
            return INITIAL_STATE;
    }

    return state;
}