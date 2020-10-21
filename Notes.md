### - getStaticProps will cache the data in run build -> first data when building page(For example: "A")

### - It retains the same original data("A") even if your data already changed in DB ("A" -> "B")

### - Data is only getting updated("B") when the server is reseted(redeployed)
