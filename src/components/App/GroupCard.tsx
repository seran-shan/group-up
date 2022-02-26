const GroupCard = (group: Group) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={group.name} subheader={group.date}></CardHeader>
    </Card>
  );
};
