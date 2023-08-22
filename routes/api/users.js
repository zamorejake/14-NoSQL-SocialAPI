const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

//all call /api/users
router.route('/').get(getUsers).post(createUser);

//all userId routes condensed /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//friend routes on /api/users/:user-id/friends/:friend-id
router.post('/:userId/friends/:friendId', addFriend);
router.delete('/:userId/friends/:friendId', removeFriend);
module.exports = router;