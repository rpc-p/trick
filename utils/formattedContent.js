function formattedContent() {
  let result = '';
  const args = Array.from(arguments);
  
  args.forEach(item => {
    if (item) result += `${item}\n`;
  })

  return result;
}

exports.formattedContent = formattedContent;