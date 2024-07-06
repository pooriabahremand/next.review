import { useRef, useState } from "react";

export function useCommentForm(slug, formAction) {
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const [state, setState] = useState({ loading: false, error: null });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    const form = event.currentTarget;
    const result = await formAction(
      slug,
      nameRef.current.value,
      messageRef.current.value
    );

    if (result) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: result,
      }));
    } else {
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      form.reset();
    }
  };

  return {
    nameRef,
    messageRef,
    state,
    handleSubmit,
  };
}
