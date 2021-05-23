1.

### - getStaticProps will cache the data in run build -> first data when building page(For example: "A")

### - It retains the same original data("A") even if your data already changed in DB ("A" -> "B")

### - Data is only getting updated("B") when the server is reseted(redeployed)

2. In Chakra UI Input
   The difference between #defaultValue and #value is #defaultValue keep the initial data even if the data value has been changed, while #value will be updated based on data

```javascript
// const [data, setData] = useState([]);
<Input
  type="text"
  id="weight"
  name="weight"
  value={data.weight}
  // update based on data.weight
  defaultValue={data.weight}
  // retain the intial value of data.weight
  ref={register({
    required: "Required",
  })}
/>
```

3. fallback option

```javascript
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "a" } }, { params: { id: "b" } }],

    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // Params contains id
  // api/[id]
  // Default params.id consists of ['a', 'b']; ~ ['api/a', 'api/b']
  // But with fallback: true if {params: {id: 'c'}} ~ api/c
  // It still gets pass to getStaticProps
}
```

4. Sometime next/link cause CSS lost. Unable to find the solution for this
