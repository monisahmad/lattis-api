import promisePool from '../database';

const updateUser = async (req, res) => {
  const {
    username, userId, birthDate, firstName, lastName,
  } = req.decoded.data;
  const formatedBirthDate = new Date(birthDate).toISOString().split('T')[0];
  const newBirthDate = req.body.birthDate || formatedBirthDate;
  const newFirstName = req.body.firstName || firstName;
  const newLastName = req.body.lastName || lastName;
  const sql = `UPDATE users SET 
  birthDate = '${newBirthDate}', 
  firstName = '${newFirstName}',
  lastName = '${newLastName}' WHERE
  username = '${username}' AND userId = '${userId}'
  `;
  console.log(sql);
  try {
    const queryResult = await promisePool.query(sql);
    if (queryResult[0].affectedRows === 1) {
      res.json({ success: true });
    } else {
      console.log(queryResult);
      res.status(500);
      res.send({ success: false, error: 'Something went wrong' });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ success: false, error: 'Something went wrong' });
  }
};

export default updateUser;
