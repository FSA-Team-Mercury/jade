import { gql } from "@apollo/client";

// get plaid call from database
export const FETCH_PLAID = gql`
  query FetchPlaid {
    plaid {
      total_transactions
      accounts {
        name
        mask
        type
        subtype
        balances {
          current
          iso_currency_code
        }
      }
      transactions {
        transaction_id
        account_id
        amount
        date
        category
        pending
        merchant_name
      }
      institution {
        logo
        name
        url
        primary_color
      }
    }
  }
`;

export const ACCOUNTS_AND_INSTITUTIONS = gql`
  query AccountsAndInstitutions {
    plaid {
      accounts {
        name
        type
        balances {
          current
          iso_currency_code
        }
      }
      institution {
        logo
        name
        url
        primary_color
      }
    }
  }
`;

export const TRANSACTIONS = gql`
  query Transactions {
    plaid {
      total_transactions
      transactions {
        transaction_id
        account_id
        amount
        date
        category
        pending
        merchant_name
      }
    }
  }
`;

export const FETCH_TOKEN = gql`
  mutation FetchToken($public_token: String!) {
    fetchPlaidToken(public_token: $public_token) {
      auth_token
    }
  }
`;
