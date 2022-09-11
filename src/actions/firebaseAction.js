import * as types from "../actions/types";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase";


//get_user_data
export const get_user_data = (userId) => async (dispatch) => {
  dispatch({
    type: types.GET_USER_DATA_LOADING,
  });
  try {
    const colRef = doc(db, "users", userId);
    const results = await getDoc(colRef);
    console.log(results);
    dispatch({
      type: types.GET_USER_DATA_SUCCESS,
      payload: results?.data(),
    });
  } catch (error) {
    alert("error");
    dispatch({
      type: types.GET_USER_DATA_FAIL,
      payload: error,
    });
  }
};

//uploading blog image
export const upload_blog_image = (image) => async (dispatch) => {
  const storage = getStorage();
  const name = new Date().getTime() + image.name;
  const storageRef = ref(storage, `blogs/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      dispatch({
        type: types.UPLOAD_BLOG_LOADING,
      });
    },
    (error) => {
      dispatch({
        type: types.UPLOAD_BLOG_FAIL,
        payload: error,
      });
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      dispatch({
        type: types.UPLOAD_BLOG_SUCCESS,
        payload: url,
      });
    }
  );
};

//create blog
export const create_blog =
  (description, image, currentUser) => async (dispatch) => {
    dispatch({
      type: types.CREATE_BLOG_LOADING,
    });
    const blog = collection(db, "blogs");
    try {
      await addDoc(blog, {
        name: currentUser?.data.firstName + " " + currentUser?.data.lastName,
        photoURL: currentUser?.data.photoURL,
        description,
        image,
        createdAt: new Date().getTime(),
      });

      dispatch({
        type: types.CREATE_BLOG_SUCCESS,
        payload: "Successful Creation",
      });
      dispatch(createMessage("Blog was created successfully", "blog"));
    } catch (error) {
      dispatch({
        type: types.CREATE_BLOG_FAIL,
        payload: error,
      });
    }
  };

//getting blogs
export const get_blogs = () => async (dispatch) => {
  dispatch({
    type: types.GET_BLOG_LOADING,
  });
  const querySnapshot = collection(db, "blogs");
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    dispatch({
      type: types.GET_BLOG_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BLOG_FAIL,
      payload: error,
    });
  }
};

export const get_users = () => async (dispatch) => {
  dispatch({
    type: types.GET_USERS_LOADING,
  });
  const querySnapshot = collection(db, "users");
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, data: doc.data() });
    });
    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAIL,
      payload: error,
    });
  }
};
//verify user
export const verify_user = (userId) => async (dispatch) => {
  dispatch({
    type: types.VERIFY_USER_LOADING,
  });
  const unVerifiedUser = doc(db, "users", userId);
  try {
    await updateDoc(unVerifiedUser, {
      isIDVerified: true,
      verified: true,
      isDocumentVerified: true,
    });
    dispatch({
      type: types.VERIFY_USER_SUCCESS,
      payload: "User Verified Successsfully",
    });
    dispatch(createMessage("This user is successfully verified", "verified"));
  } catch (error) {
    dispatch({
      type: types.VERIFY_USER_FAIL,
      payload: error,
    });
  }
};

//make admin
export const make_admin = (userId) => async (dispatch) => {
  dispatch({
    type: types.MAKE_USER_ADMIN_LOADING,
  });
  const admin = doc(db, "users", userId);
  try {
    await updateDoc(admin, {
      isAdmin: true,
    });
    dispatch({
      type: types.MAKE_USER_ADMIN_SUCCESS,
      payload: "User is admin",
    });
    dispatch(createMessage("This user is successfully now an admin", "admin"));
  } catch (error) {
    dispatch({
      type: types.MAKE_USER_ADMIN_FAIL,
      payload: error,
    });
  }
};

//remove admin
export const remove_admin = (userId) => async (dispatch) => {
  dispatch({
    type: types.REMOVE_USER_ADMIN_LOADING,
  });
  const admin = doc(db, "users", userId);
  try {
    await updateDoc(admin, {
      isAdmin: false,
    });
    dispatch({
      type: types.REMOVE_USER_ADMIN_SUCCESS,
      payload: "User not admin",
    });
    dispatch(
      createMessage("This user is successfully no longer an admin", "not-admin")
    );
  } catch (error) {
    dispatch({
      type: types.REMOVE_USER_ADMIN_FAIL,
      payload: error,
    });
  }
};

export const un_verify_user = (userId) => async (dispatch) => {
  dispatch({
    type: types.UN_VERIFY_USER_LOADING,
  });
  const unVerifiedUser = doc(db, "users", userId);

  try {
    await updateDoc(unVerifiedUser, {
      isIDVerified: false,
      verified: false,
      isDocumentVerified: false,
    });
    dispatch({
      type: types.UN_VERIFY_USER_SUCCESS,
      payload: "User UnVerified Successsfully",
    });
    dispatch(
      createMessage("This user is successfully unverified", "un_verified")
    );
  } catch (error) {
    dispatch({
      type: types.UN_VERIFY_USER_FAIL,
      payload: error,
    });
  }
};

export const create_user = (user) => async (dispatch) => {
  dispatch({
    type: types.CREATE_USER_LOADING,
  });
  const users = collection(db, "users");
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    //if a user is created successfully
    if (userCredential) {
       //alert storing user in database
     

    const userRef = doc(db, "users", userCredential.user.uid);
    //get the current timestamp using firebase
    const timestamp = serverTimestamp();
    const createdUser = await setDoc(userRef, {
      name: user.names,
      email: user.email,
      phone: user.phone,
      photoURL: userCredential.user.photoURL,
      verified: false,
      isAdmin: false,
      uid: userCredential.user.uid,
      createdAt: timestamp,
    });
    // dispatch({
    //   type: types.CREATE_USER_SUCCESS,
    //   payload: createdUser,
    // });
    dispatch(get_user_data(userCredential.user.uid));
     //get_user_data(userCredential.user.uid);
    dispatch(createMessage("You registered successfully please login", "register_success"));

    //
  }

  } catch (error) {
    alert(error.message);
    dispatch({
      type: types.CREATE_USER_FAIL,
      payload: error.message,
    });
  }
}


export const user_login = (loginValues) => async (dispatch) => {
  const { email, password } = loginValues;
  dispatch({
    type: types.LOGIN_LOADING,
  });
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: userCredential.user,
    });
  } catch (error) {
    //alert error
    alert(error.message);
    dispatch({
      type: types.LOGIN_FAIL,
      payload: error.FirebaseError,
    });
    dispatch(
      createMessage(
        "Incorrect Credentials, please enter correct password and email",
        "credentials"
      )
    );
  }
};

export const current_user = () => async (dispatch) => {
  const auth = getAuth();
  dispatch({
    type: types.CURRENT_USER_LOADING,
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      dispatch({
        type: types.CURRENT_USER_SUCCESS,
        payload: uid,
      });
    } else {
      dispatch({
        type: types.CURRENT_USER_FAIL,
        payload: "Not user is logged in",
      });
    }
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: types.LOGOUT_SUCCESS,
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_ERRORS_LOADING,
  });
  dispatch({
    type: types.CLEAR_ERRORS_SUCCESS,
  });
};

export const createMessage = (msg, reason) => (dispatch) => {
  dispatch({
    type: types.CREATE_MESSAGES_LOADING,
  });
  dispatch({
    type: types.CREATE_MESSAGES_SUCCESS,
    payload: msg,
    reason: reason,
  });
};

export const clearMessage = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_MESSAGES_LOADING,
  });
  dispatch({
    type: types.CLEAR_MESSAGES_SUCCESS,
  });
};
