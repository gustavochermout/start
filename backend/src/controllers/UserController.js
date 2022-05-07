const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');
const mongoose = require('mongoose');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret);
}

module.exports = {
  async store(req, res) {
    let { email, password } = req.body;

    try {
      if (!email || !password)
        return res.status(422).send({ error: 'Os campos email e password são obrigatórios.' });

      if (await User.findOne({ email }))
        return res.status(400).send({ error: 'E-mail já cadastrado' });

      password = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password,
      });

      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao tentar cadastrar o usuário' });
    }
  },

  async auth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
      return res.status(400).send({ error: 'Não foi possível encontrar o e-mail informado' });

    if (!password || !await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Senha incorreta, tente novamente' });

    user.password = undefined;

    res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  },

  async updatePassword(req, res) {
    let { oldPassword, newPassword } = req.body;
    const { user_id } = req.headers;

    try {
      if (!user_id || !oldPassword || !newPassword)
        return res.status(422).send({ error: 'Todos os campos são obrigatórios' });

      const user = await User.findOne({ _id: mongoose.Types.ObjectId(user_id) }).select('+password');

      if (!user)
        return res.status(400).send({ error: 'Erro ao tentar atualizar a senha, recarregue a página e tente novamente' });

      if (!await bcrypt.compare(oldPassword, user.password))
        return res.status(400).send({ error: 'A senha atual informada está incorreta, tente novamente' });

      newPassword = await bcrypt.hash(newPassword, 10);

      await User.updateOne({ _id: mongoose.Types.ObjectId(user_id) }, {
        password: newPassword,
      });

      return res.status(200).send({ msg: 'Senha atualizada com sucesso!' });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao tentar atualizar a senha, recarregue a página e tente novamente' });
    }
  },

  async updateEmail(req, res) {
    const { email } = req.body;
    const { user_id } = req.headers;

    try {
      if (!user_id || !email)
        return res.status(422).send({ error: 'Todos os campos são obrigatórios' });

      const user = await User.findOne({ email });

      if (user && user._id.toString() === user_id)
        return res.status(200).send({ msg: 'Não foi realizada nenhuma alteração no e-mail do usuário informado' });

      if (user)
        return res.status(400).send({ error: 'E-mail já cadastrado' });

      if (!await User.findById(user_id))
        return res.status(400).send({ error: 'Erro ao tentar atualizar o e-mail, recarregue a página e tente novamente' });

      await User.updateOne({ _id: mongoose.Types.ObjectId(user_id) }, {
        email
      });

      return res.status(200).send({ msg: 'E-mail atualizado com sucesso!' });
    } catch (err) {
      return res.status(400).send({ error: 'Erro ao tentar atualizar o e-mail, recarregue a página e tente novamente' });
    }
  }
}