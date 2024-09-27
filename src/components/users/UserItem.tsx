import { Link } from "react-router-dom";
import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import { EditUser } from "./EditUser";

type UserItemProps = {
  user: User;
  deleteUser: (id: string) => void;
  token: string | null;
  noPermission: () => void;
  users: User[];
  setUsers: (users: User[]) => void;
};

export const UserItem: React.FC<UserItemProps> = ({
  user,
  deleteUser,
  token,
  noPermission,
  users,
  setUsers,
}) => {
  return (
    <Card key={user.id}>
      <CardBody display="flex" flexDir="column" justifyContent="center">
        <Link to={`/users/${user.id}`}>
          <Text>
            <strong>id: </strong>
            {user.id}
          </Text>
          <Text>
            <strong>username: </strong>
            {user.username}
          </Text>
          <Text>
            <strong>password: </strong>
            {user.password}
          </Text>
          <Text>
            <strong>name: </strong>
            {user.name}
          </Text>
          <Text>
            <strong>email: </strong>
            {user.email}
          </Text>
          <Text>
            <strong>phoneNumber: </strong>
            {user.phoneNumber}
          </Text>
          <Text>
            <strong>profilePicture: </strong>
            {user.profilePicture}
          </Text>
        </Link>
        <Box mt={2}>
          <Button
            mr={4}
            onClick={token ? () => deleteUser(user.id) : noPermission}
          >
            Delete User
          </Button>
          <EditUser users={users} setUsers={setUsers} id={user.id} />
        </Box>
      </CardBody>
    </Card>
  );
};
