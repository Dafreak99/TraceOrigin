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
  id="soLuong"
  name="soLuong"
  value={data.soLuong}
  // update based on data.soLuong
  defaultValue={data.soLuong}
  // retain the intial value of data.soLuong
  ref={register({
    required: "Required",
  })}
/>
```
