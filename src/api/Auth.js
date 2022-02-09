const uri = 'https://hodathefood.vercel.app/api';

const AuthApis = {
  login: async (content) => {
    try {
      const result = await fetch(`${uri}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      }).then((data) => data.json());

      const { data } = result;
      if (!data) throw new Error(result.message);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getAccessToken: async () => {
    try {
      const result = await fetch(`${uri}/users/refresh_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((data) => data.json());
      const { token } = result;
      if (!token) throw new Error(result.message);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getInfoUser: async (token) => {
    try {
      const result = await fetch(`${uri}/users/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }).then((data) => data.json());
      const { data } = result;
      if (!data) throw new Error(result.message);
      console.log('data', data);
      return data;
    } catch (error) {
      throw error;
    }
  },
  getHabit: async (token) => {
    try {
      const result = await fetch(`${uri}/users/habit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }).then((data) => data.json());
      const { data } = result;
      if (!data) throw new Error(result.message);
      return data;
    } catch (error) {
      throw error;
    }
  },
  logout: async (token) => {
    try {
      const result = await fetch(`${uri}/users/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }).then((data) => data.json());
    } catch (error) {
      throw error;
    }
  },
  addHabit: async (token, value) => {
    try {
      const result = await fetch(`${uri}/users/habit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(value),
      }).then((data) => data.json());
      const { data } = result;
      if (!data) throw new Error(result.message);
      return data;
    } catch (error) {
      throw error;
    }
  },
  createBMIWater: async (token, value) => {
    const content = {
      weight: value,
    };
    try {
      const result = await fetch(`${uri}/users/create-bmi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(content),
      }).then((data) => data.json());
      const { data } = result;
      if (!data) throw new Error(result.message);
      alert('send');
      return data;
    } catch (error) {
      throw error;
    }
  },
  updateBMIWater: async (token, value) => {
    const content = {
      weight: value,
    };
    try {
      const result = await fetch(`${uri}/users/update-bmi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(content),
      }).then((data) => data.json());
      const { data } = result;
      if (!data) throw new Error(result.message);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
export default AuthApis;
