import { User, SUPPLIER_TEAM_ID } from '../utils';

export function getMockLoggedInUser(): User {
  return {
    id: 'user-1',
    email: 'user1@citrusad.com',
    firstName: 'Bill',
    lastName: 'Smith',
    teamIds: [SUPPLIER_TEAM_ID],
  };
}

export function getMockUsers(): User[] {
  return [
    {
      id: 'user-2',
      email: 'user-2@gmail.com',
      firstName: 'Tom',
      lastName: 'Jones',
      teamIds: [SUPPLIER_TEAM_ID],
    },
    {
      id: 'user-3',
      email: 'user-3@citrusad.com',
      firstName: 'Elvis',
      lastName: 'Presley',
      teamIds: [SUPPLIER_TEAM_ID],
    },
    {
      id: 'user-4',
      email: 'user-4@gmail.com',
      firstName: 'Trewrom',
      lastName: 'wer',
      teamIds: [SUPPLIER_TEAM_ID],
    },
    {
      id: 'user-5',
      email: 'user-5@citrusad.com',
      firstName: 'sad',
      lastName: 'sadasd',
      teamIds: [SUPPLIER_TEAM_ID],
    },
    {
      id: 'user-6',
      email: 'user-6@gmail.com',
      firstName: 'czx',
      lastName: 'zxczxc',
      teamIds: [SUPPLIER_TEAM_ID],
    },
    {
      id: 'user-7',
      email: 'user-7@citrusad.com',
      firstName: 'vbnvb',
      lastName: 'gfhfgh',
      teamIds: [SUPPLIER_TEAM_ID],
    },
  ];
}
