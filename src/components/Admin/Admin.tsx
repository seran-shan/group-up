import React, { useEffect } from 'react';

const Admin = () => {
  useEffect(() => {
    window.location.href = 'https://app.jetadmin.io/app/test_3267/prod/page/groups';
  }, []);
  return <p>hello</p>;
};

export default Admin;
