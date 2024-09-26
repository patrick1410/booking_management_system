import { Link } from "react-router-dom";
import { Card, CardBody, Text, Box, Button } from "@chakra-ui/react";
import { EditHost } from "./EditHost";

type HostItemProps = {
  host: Host;
  deleteHost: (id: string) => void;
  token: string | null;
  noPermission: () => void;
};

export const HostItem: React.FC<HostItemProps> = ({
  host,
  deleteHost,
  token,
  noPermission,
}) => {
  return (
    <Card key={host.id}>
      <CardBody display="flex" flexDir="column" justifyContent="center">
        <Link to={`/hosts/${host.id}`}>
          <Text>
            <strong>id: </strong>
            {host.id}
          </Text>
          <Text>
            <strong>username: </strong>
            {host.username}
          </Text>
          <Text>
            <strong>password: </strong>
            {host.password}
          </Text>
          <Text>
            <strong>name: </strong>
            {host.name}
          </Text>
          <Text>
            <strong>email: </strong>
            {host.email}
          </Text>
          <Text>
            <strong>phoneNumber: </strong>
            {host.phoneNumber}
          </Text>
          <Text>
            <strong>profilePicture: </strong>
            {host.profilePicture}
          </Text>
          <Text>
            <strong>aboutMe: </strong>
            {host.aboutMe}
          </Text>{" "}
        </Link>
        <Box mt={2}>
          <Button
            mr={4}
            onClick={token ? () => deleteHost(host.id) : noPermission}
          >
            Delete Host
          </Button>
          <EditHost id={host.id} />
        </Box>
      </CardBody>
    </Card>
  );
};
