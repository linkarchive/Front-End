type ErrorComponentProps = {
  statusCode: number;
};

const ErrorComponent = ({ statusCode }: ErrorComponentProps) => {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  );
};

ErrorComponent.getInitialProps = ({ res, err }) => {
  let statusCode;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  } else {
    statusCode = 404;
  }

  return { statusCode };
};

export default ErrorComponent;
