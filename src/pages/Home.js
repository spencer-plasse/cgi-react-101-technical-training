// "/home" page (or default view at "/" when the application is launched)
export const Home = () => {
  return (
    <article className="w-100">
      <h3 className="mb-3 text-center">Welcome to the Body Age Calculator!</h3>
      <p>This tool allows you to calculate your body age by answering a few simple questions.</p>
      <p>
        To begin, click on "Register" in the navbar. Once you create an account, you will be redirected to log in.
        While logged in, your username will be displayed on the right end of the navbar.
      </p>
      <p>
        Click on "Questions" while logged in and provide your date of birth and answers to the three questions.
        Once you submit your answers, you will be redirected to the Results page where you can view the calculated
        body age as well as your answers for each result. You are able to filter by all results, recent results (past week),
        or results older than a week.
      </p>
      <p>
        <span className="text-danger"><b>WARNING</b></span>: User login and result data is saved per browser, so you 
        will have to register and answer the questions again when using a new browser to view results.
      </p>
      <p>Thank you for visiting and I hope you enjoy!</p>
    </article>
  )
}