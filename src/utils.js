export const getIsSubmit = (ev, handleSubmit) => ev.code === "Enter" ? handleSubmit(ev.target.value) : null;
