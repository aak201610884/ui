const getById = async (req, res, CollectionName) => {
  try {
    const id = req.params.id;
    const data = await CollectionName.findById(id);
    if (!data) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteData = async (
  req,
  res,
  firstDocument,
  secondDocuments,
  shareId
) => {
  try {
    const id = req.params.id;

    const data = await firstDocument.findByIdAndRemove(id);

    if (secondDocuments != null) {
      for (const values of Object.values(secondDocuments)) {
        const valuesOfData = await values.deleteMany({ shareId: id });
        if (!valuesOfData.deletedCount) {
          return res.status(404).json({ msg: "Data not found" });
        }
      }
    }
    if (!data) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res.json({ msg: "Deletion successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const create = async (req, res, CollectionName, searchFieldName) => {
  try {
    const searchFieldValue = req.body[searchFieldName];
    const existingData = await CollectionName.findOne({
      [searchFieldName]: searchFieldValue,
    });

    if (existingData) {
      return res
        .status(400)
        .json({
          msg: `Data with ${searchFieldName} '${searchFieldValue}' already exists`,
        });
    }

    const newData = new CollectionName(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
const getAll = async (req, res, CollectionName, searchField) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.q || "";

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const searchFilter = {};
    searchFilter[searchField] = { $regex: searchQuery, $options: "i" };
    const totalCount = await CollectionName.countDocuments(searchFilter);

    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.totalCount = totalCount;

    results.data = await CollectionName.find(searchFilter)
      .limit(limit)
      .skip(startIndex);

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = create;
module.exports = getAll;
module.exports = getById;
module.exports = deleteData;
