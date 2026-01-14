import {
  IconCashBanknoteMove,
  IconCashBanknoteMoveBack,
  IconCircleCheck,
  IconHelp,
  IconLayout,
  IconListDetails,
  IconLockPassword,
  IconSearch,
  IconSettings,
  IconTransactionRupee,
  IconUsers,
} from '@tabler/icons-react';

export const dashboardNavlinks = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: IconLayout,
    },
    {
      title: 'Credentials Verify',
      url: '/admin/credentials-verify',
      icon: IconCircleCheck,
    },
    {
      title: 'Credentials Change',
      url: '/admin/credentials-change',
      icon: IconLockPassword,
    },
    {
      title: 'Listings',
      url: '/admin/listings',
      icon: IconListDetails,
    },
    {
      title: 'Transactions',
      url: '/admin/transactions',
      icon: IconTransactionRupee,
    },
    {
      title: 'Withdrawals',
      url: '/admin/withdrawls',
      icon: IconCashBanknoteMove,
    },
    {
      title: 'Deposits',
      url: '#',
      icon: IconCashBanknoteMoveBack,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/admin/settings',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '/admin/help',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
};
