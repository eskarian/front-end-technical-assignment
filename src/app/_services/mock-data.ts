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
  ];
}
