const addReview = (_, {input}, {cache}) => {
  input |> console.log ('input addReview Resolver', #)
  const review = {__typename: `review`, ...input}
  // const review = input
  cache.data.data |> console.log ('cache.data.data', #)
  cache.writeData ({data: {review}})
  console.log (`addReviewLinks returning`)
  // return {success: 5, __typename: `foo__typename`}
}

export default addReview