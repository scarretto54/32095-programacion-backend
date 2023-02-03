const validateId = (req, res, next) => {
  const id = req.params.id;
  if (isNaN(id)) res.status(400).json({ error: "El parámetro no es válido" });
  else {
    req.params.id = parseInt(id);
    next();
  }
};

const validatePostBody = (req, res, next) => {
  let { title, author, pages, thumbnail } = req.body;
  if (
    !(typeof title == "string" && /\w+/.test(title)) ||
    !(typeof author == "string" && /\w+/.test(title)) ||
    !(
      (typeof pages == "string" || typeof pages == "number") &&
      /^\d+(\.\d+)?$/.test(pages)
    ) ||
    !(
      typeof thumbnail == "string" &&
      /^(ftp|http|https):\/\/[^ "]+$/.test(thumbnail)
    )
  )
    res.status(400).json({ error: "Los valores enviados no son válidos" });
  else {
    title = title.trim();
    author = author.trim();
    pages = Math.round(parseFloat(pages) * 100) / 100;
    thumbnail = thumbnail.trim();
    req.body = { ...req.body, title, author, pages, thumbnail };
    next();
  }
};

const validatePutBody = (req, res, next) => {
  let { title, author, pages, thumbnail } = req.body;
  if (
    (title !== undefined && !(typeof title == "string" && /\w+/.test(title))) ||
    (author !== undefined && !(typeof author == "string" && /\w+/.test(author))) ||
    (pages !== undefined &&
      !(
        (typeof pages == "string" || typeof pages == "number") &&
        /^\d+(\.\d+)?$/.test(pages)
      )) ||
    (thumbnail !== undefined &&
      !(
        typeof thumbnail == "string" &&
        /^(ftp|http|https):\/\/[^ "]+$/.test(thumbnail)
      ))
  )
    res.status(400).json({ error: "Los valores enviados no son válidos" });
  else if (title === undefined && author === undefined && pages === undefined && thumbnail == undefined)
    res.status(400).json({ error: "No hay campos válidos para actualizar" });
  else {
    title = title?.trim();
    author = author?.trim();
    pages = pages && Math.round(parseFloat(pages) * 100) / 100;
    thumbnail = thumbnail?.trim();
    req.body = { ...req.body, title, author, pages, thumbnail };
    next();
  }
};
module.exports = { validateId, validatePostBody, validatePutBody };
